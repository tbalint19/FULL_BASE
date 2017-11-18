package com.base.coreapi.service.admin;

import com.base.coreapi.model.admin.Permission;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.base.coreapi.security.SecurityConstants.EXPIRATION_TIME;
import static com.base.coreapi.security.SecurityConstants.SECRET;
import static com.base.coreapi.security.SecurityConstants.TOKEN_PREFIX;

@Service
public class TokenService {

    public String createToken(String username){
        String token = Jwts.builder()
                .setAudience(username)
                .setSubject("default-admin")
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        return TOKEN_PREFIX + token;
    }

    public String parseTokenForUsername(String token){
        return Jwts.parser()
            .setSigningKey(SECRET.getBytes())
            .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
            .getBody()
            .getAudience();
    }

    public String parseTokenForPermission(String token){
        return Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

    }

}
