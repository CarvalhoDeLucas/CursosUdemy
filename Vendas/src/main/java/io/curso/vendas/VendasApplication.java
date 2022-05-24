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
            clientes.save(new Cliente("Lucas"));
            clientes.save(new Cliente("Eduardo"));

            boolean existe = clientes.existsByNome("Lucas");
            System.out.println("Cliente com nome Lucas existe? " + existe);
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(VendasApplication.class, args);
    }

}
