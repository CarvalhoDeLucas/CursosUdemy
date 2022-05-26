package io.curso.vendas.domain.repository;

import io.curso.vendas.domain.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Produtos  extends JpaRepository<Produto, Integer> {
}
