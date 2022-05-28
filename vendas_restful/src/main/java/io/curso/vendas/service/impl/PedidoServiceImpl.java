package io.curso.vendas.service.impl;

import io.curso.vendas.domain.entity.Cliente;
import io.curso.vendas.domain.entity.ItemPedido;
import io.curso.vendas.domain.entity.Pedido;
import io.curso.vendas.domain.entity.Produto;
import io.curso.vendas.domain.repository.Clientes;
import io.curso.vendas.domain.repository.ItensPedido;
import io.curso.vendas.domain.repository.Pedidos;
import io.curso.vendas.domain.repository.Produtos;
import io.curso.vendas.exception.RegraNegocioException;
import io.curso.vendas.rest.dto.ItensPedidoDTO;
import io.curso.vendas.rest.dto.PedidoDTO;
import io.curso.vendas.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final Pedidos pedidos;
    private final Clientes clientes;
    private final Produtos produtos;
    private final ItensPedido itensPedido;

    @Override
    @Transactional
    public Pedido salvar(PedidoDTO dto) {
        Integer idCliente = dto.getCliente();
        Cliente cliente = clientes
                .findById(idCliente)
                .orElseThrow(() -> new RegraNegocioException("Código de cliente inválido"));

        Pedido pedido = new Pedido();
        pedido.setTotal(dto.getTotal());
        pedido.setDataPedido(LocalDate.now());
        pedido.setCliente(cliente);

        List<ItemPedido> itensPedidos = converterItens(pedido, dto.getItens());

        pedidos.save(pedido);
        itensPedido.saveAll(itensPedidos);

        pedido.setItens(itensPedidos);

        return pedido;
    }

    private List<ItemPedido> converterItens(Pedido pedido, List<ItensPedidoDTO> itens) {
        if (itens.isEmpty()) {
            throw new RegraNegocioException("Não é possível realizar um pedido sem itens.");
        }

        return itens
                .stream()
                .map(dto -> {
                    Integer idProduto = dto.getProduto();
                    Produto produto = produtos
                            .findById(idProduto)
                            .orElseThrow(() ->  new RegraNegocioException("Código de produto inválido: " + idProduto));

                    ItemPedido itemPedido = new ItemPedido();
                    itemPedido.setQuantitade(dto.getQuantidade());
                    itemPedido.setPedido(pedido);
                    itemPedido.setProduto(produto);

                    return itemPedido;
                }).collect(Collectors.toList());
    }
}
