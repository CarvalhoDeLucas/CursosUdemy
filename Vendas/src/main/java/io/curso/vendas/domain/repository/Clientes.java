package io.curso.vendas.domain.repository;

import io.curso.vendas.domain.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Clientes extends JpaRepository<Cliente, Integer> {

    List<Cliente> findByNomeLike(String nome);

    //  Confere se existe um cliente com esse nome
    boolean existsByNome(String nome);

    //  Procura por nome ou id
    //  List<Cliente> findByNomeOrId(String nome, Integer id);

}
