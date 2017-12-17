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
                .regexMatchers(HttpMethod.GET,".*js$").permitAll()
                .regexMatchers(HttpMethod.GET,".*css$").permitAll()
                .regexMatchers(HttpMethod.GET,".*ico$").permitAll()
                .regexMatchers(HttpMethod.GET,".*woff2$").permitAll()
                .regexMatchers(HttpMethod.GET,".*woff$").permitAll()
                .regexMatchers(HttpMethod.GET,".*ttf$").permitAll()
                .regexMatchers(HttpMethod.GET,".*png$").permitAll()
                .regexMatchers(HttpMethod.GET,".*jpg$").permitAll()
                .regexMatchers(HttpMethod.GET,".*jpeg$").permitAll()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .antMatchers(HttpMethod.GET, "/calendar").permitAll()
                .antMatchers(HttpMethod.GET, "/messages").permitAll()
                .antMatchers(HttpMethod.GET, "/faq").permitAll()
                .antMatchers(HttpMethod.GET, "/reset").permitAll()
                .antMatchers(HttpMethod.GET, "/confirm").permitAll()
                .antMatchers(HttpMethod.GET, "/about").permitAll()
                .antMatchers(HttpMethod.GET, "/doctors").permitAll()
                .antMatchers(HttpMethod.GET, "/api/faq/all").permitAll()
                .antMatchers(HttpMethod.GET, CHECK_URLS).permitAll()
                .antMatchers(HttpMethod.POST, AUTH_URLS).permitAll()
                .antMatchers(RESET_URLS).permitAll()
                .antMatchers(HttpMethod.GET, MAIN_MESSAGE_URL).permitAll()
                .antMatchers(HttpMethod.GET, CALENDAR_MESSAGE_URL).permitAll()
                .antMatchers(CONFIRM_URLS).permitAll()
                .antMatchers(DEFAULT_LOGIN_URL).denyAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager));
    }
}
