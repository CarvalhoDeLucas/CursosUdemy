package io.curso.vendas;

import io.curso.vendas.domain.entity.Cliente;
import io.curso.vendas.domain.repository.Clientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class VendasApplication {

    @Bean
    public CommandLineRunner init(@Autowired Clientes clientes) {
        return args -> {
            System.out.println("Salvando");
            clientes.salvar(new Cliente("Lucas"));
            clientes.salvar(new Cliente("Eduardo"));

            System.out.println("Listando");
            List<Cliente> todosClientes = clientes.obterTodos();
            todosClientes.forEach(System.out::println);

            System.out.println("Atualizando");
            todosClientes.forEach(c -> {
                c.setNome(c.getNome() + " atualizado");
                clientes.atualizar(c);
            });

            System.out.println("Listando por nome");
            clientes.buscarPorNome("Lu").forEach(System.out::println);

            System.out.println("Deletando");
            clientes.obterTodos().forEach(c -> {
                clientes.deletar(c);
            });

            System.out.println("Listando");
            todosClientes = clientes.obterTodos();
            if (todosClientes.isEmpty()) {
                System.out.println("Nenhum cliente encontrado");
            } else {
                todosClientes.forEach(System.out::println);
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(VendasApplication.class, args);
    }

}
