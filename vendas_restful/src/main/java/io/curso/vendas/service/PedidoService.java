package io.curso.vendas.service;

import io.curso.vendas.domain.entity.Pedido;
import io.curso.vendas.domain.enuns.StatusPedido;
import io.curso.vendas.rest.dto.PedidoDTO;

import java.util.Optional;

public interface PedidoService {

    Pedido salvar(PedidoDTO dto);
    Optional<Pedido> obterPedidoCompleto(Integer id);
    void atualizaStatus(Integer id, StatusPedido statusPedido);

}
