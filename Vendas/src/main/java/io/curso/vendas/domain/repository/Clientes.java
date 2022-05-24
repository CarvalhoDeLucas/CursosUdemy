package io.curso.vendas.domain.repository;

import io.curso.vendas.domain.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Clientes extends JpaRepository<Cliente, Integer> {

    //  Confere se existe um cliente com esse nome
    boolean existsByNome(String nome);

    List<Cliente> findByNomeLike(String nome);
    // OU
    // JPQL
    @Query(value = "select c from Cliente c where c.nome like :nome")
    List<Cliente> econtrarPorNome(@Param("nome") String nome);
    // SQL
    // @Query(value = "select * from cliente c where c.nome like '%:nome%'", nativeQuery = true)
    // List<Cliente> econtrarPorNome(@Param("nome") String nome);

    //  Procura por nome ou id
    //  List<Cliente> findByNomeOrId(String nome, Integer id);

    @Query("select c from Cliente c left join fetch c.pedidos p where c.id = :id")
    Cliente findClienteFetchPedidos(@Param("id") Integer id);

}
