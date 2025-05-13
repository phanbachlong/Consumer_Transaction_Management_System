//package com.project88.banking.security;
//
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class FilterConfig {
//
//    @Bean
//    public JwtTokenUtil jwtTokenUtil() {
//        return new JwtTokenUtil();
//    }
//
//    @Bean
//    public JwtFilter jwtFilterBean() {
//        return new JwtFilter(jwtTokenUtil());
//    }
//
//    @Bean
//    public FilterRegistrationBean<JwtFilter> jwtFilter(JwtFilter filter) {
//        FilterRegistrationBean<JwtFilter> registration = new FilterRegistrationBean<>();
//        registration.setFilter(filter);
//        registration.addUrlPatterns("/api/secure/*");
//        return registration;
//    }
//}
