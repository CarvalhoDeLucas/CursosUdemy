package oi.curso.lucas.service;

import oi.curso.lucas.model.Cliente;
import oi.curso.lucas.repository.ClientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientesService {

    //@Autowired
    //private ClientesRepository repository;

    private ClientesRepository repository;

    @Autowired
    public ClientesService(ClientesRepository repository) {
        this.repository = repository;
    }

    public void salvarCliente(Cliente cliente) {
        validarCliente(cliente);

        this.repository.persistir(cliente);
    }

    public void validarCliente(Cliente cliente) {
        //Aplicar validações
    }
}
