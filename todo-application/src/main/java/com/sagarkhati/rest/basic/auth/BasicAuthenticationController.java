package com.sagarkhati.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

	@GetMapping(path = "/basicauth")
	public BasicAuthenticationBean basicAuthBean() {
		return new BasicAuthenticationBean("You are authenticated");
	}
}
