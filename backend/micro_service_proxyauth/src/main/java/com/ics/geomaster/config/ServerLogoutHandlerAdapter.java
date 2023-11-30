package com.ics.geomaster.config;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.ServerLogoutHandler;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class ServerLogoutHandlerAdapter implements ServerLogoutHandler {

    private final LogoutService logoutService;

    @Override
    public Mono<Void> logout(WebFilterExchange exchange, Authentication authentication) {
        return Mono.fromRunnable(() -> {
            logoutService.logout(exchange.getExchange().getRequest(), exchange.getExchange().getResponse(), authentication);
            exchange.getExchange().getResponse().setStatusCode(HttpStatus.OK);
        });
    }
}
