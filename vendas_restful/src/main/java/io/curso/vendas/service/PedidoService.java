package io.curso.vendas.service;

import io.curso.vendas.domain.entity.Pedido;
import io.curso.vendas.rest.dto.PedidoDTO;

public interface PedidoService {

    Pedido salvar(PedidoDTO dto);

}
