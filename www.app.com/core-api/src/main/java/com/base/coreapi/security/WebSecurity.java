package com.base.coreapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static com.base.coreapi.security.SecurityConstants.*;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()

                .antMatchers(HttpMethod.GET, FRONTEND_ROUTES).permitAll()

                .regexMatchers(HttpMethod.GET, STATIC_ASSET_EXTENSIONS).permitAll()
                .regexMatchers(HttpMethod.GET, IMAGE_EXTENSIONS).permitAll()

                .antMatchers(CHECK_URLS).permitAll()
                .antMatchers(AUTH_URLS).permitAll()
                .antMatchers(RESET_URLS).permitAll()
                .antMatchers(CONFIRM_URLS).permitAll()

                .antMatchers(PUBLIC_ROUTES).permitAll()

                .antMatchers(DEFAULT_LOGIN_URL).denyAll()

                .antMatchers(HttpMethod.OPTIONS).permitAll()

                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager));
    }
}
