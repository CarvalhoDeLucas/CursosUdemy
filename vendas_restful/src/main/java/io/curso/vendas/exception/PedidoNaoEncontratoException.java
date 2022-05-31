package io.curso.vendas.exception;

public class PedidoNaoEncontratoException extends RuntimeException {

    public PedidoNaoEncontratoException() {
        super("Pedido não encontrado.");
    }
}
