package com.base.coreapi.security;

public class SecurityConstants {

    public static final String SECRET = "VerySecretKey";
    public static final long EXPIRATION_TIME = Long.MAX_VALUE;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String DEFAULT_LOGIN_URL = "/login";
    public static final String CHECK_URLS = "/api/check/**";
    public static final String AUTH_URLS = "/api/auth/**";
    public static final String CONFIRM_URLS = "/api/confirm/**";
    public static final String RESET_URLS = "/api/reset/**";
    public static final String[] IMAGE_EXTENSIONS = {
            ".*png$", ".*jpg$", ".*jpeg$"
    };
    public static final String[] STATIC_ASSET_EXTENSIONS = {
            ".*ico$", ".*woff2$", ".*woff$", ".*ttf$", ".*css$", ".*js$"
    };
    public static final String[] FRONTEND_ROUTES = {
            "/",
            "/calendar",
            "/messages",
            "/faq",
            "/reset",
            "/confirm",
            "/about",
            "/doctors",
            "/api/faq/all"
    };

    public static final String[] PUBLIC_ROUTES = {
            "/api/info/mainmessage/get/home",
            "/api/info/mainmessage/get/calendar"
    };
}
