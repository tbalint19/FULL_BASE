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
                .regexMatchers(".*js$").permitAll()
                .regexMatchers(".*css$").permitAll()
                .regexMatchers(".*ico$").permitAll()
                .regexMatchers(".*woff2$").permitAll()
                .regexMatchers(".*woff$").permitAll()
                .regexMatchers(".*ttf$").permitAll()
                .regexMatchers(".*png$").permitAll()
                .regexMatchers(".*jpg$").permitAll()
                .regexMatchers(".*jpeg$").permitAll()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .antMatchers(HttpMethod.GET, "/calendar").permitAll()
                .antMatchers(HttpMethod.GET, "/messages").permitAll()
                .antMatchers(HttpMethod.GET, "/faq").permitAll()
                .antMatchers(HttpMethod.GET, "/reset").permitAll()
                .antMatchers(HttpMethod.GET, "/security").permitAll()
                .antMatchers(HttpMethod.GET, "/edit").permitAll()
                .antMatchers(HttpMethod.POST, AUTH_URLS).permitAll()
                .antMatchers(HttpMethod.POST, "/api/upload/file").permitAll()
                .antMatchers(RESET_URLS).permitAll()
                .antMatchers(DEFAULT_LOGIN_URL).denyAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers(HttpMethod.GET, APP_URL).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager));
    }

}
