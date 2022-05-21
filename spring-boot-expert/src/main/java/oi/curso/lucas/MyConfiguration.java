package oi.curso.lucas;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Development
public class MyConfiguration {

    //Roda assim que o programa iniciar
    @Bean
    public CommandLineRunner executar() {
        return args -> {
            System.out.printf("Config Development");
        };
    }

}
