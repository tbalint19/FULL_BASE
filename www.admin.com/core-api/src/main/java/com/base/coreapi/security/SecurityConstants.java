package com.base.coreapi.security;

public class SecurityConstants {

    public static final String SECRET = "VerySecretKey";
    public static final long EXPIRATION_TIME = Long.MAX_VALUE;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String DEFAULT_LOGIN_URL = "/login";
    public static final String AUTH_URLS = "/api/admin/**";
    public static final String RESET_URLS = "/api/reset/**";
    public static final String APP_URL = "/";
}
