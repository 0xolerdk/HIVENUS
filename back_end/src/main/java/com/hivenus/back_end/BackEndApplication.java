package com.hivenus.back_end;

import org.apache.coyote.Request;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;


import javax.tools.DocumentationTool;

@SpringBootApplication
public class BackEndApplication {



	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

}
