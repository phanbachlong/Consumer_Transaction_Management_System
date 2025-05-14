//package com.project88.banking.security;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//
//import java.io.IOException;
//import java.util.ArrayList;
//
//public class JwtFilter implements Filter {
//
//    private final JwtTokenUtil jwtTokenUtil;
//
//    public JwtFilter(JwtTokenUtil jwtTokenUtil) {
//        this.jwtTokenUtil = jwtTokenUtil;
//    }
//
//    @Override
//    public void doFilter(ServletRequest servletRequest,
//                         ServletResponse servletResponse,
//                         FilterChain filterChain)
//            throws IOException, ServletException {
//
//        HttpServletRequest request = (HttpServletRequest) servletRequest;
//        HttpServletResponse response = (HttpServletResponse) servletResponse;
//
//        String path = request.getRequestURI();
//        System.out.println("➡️ Request path: " + path);
//
//        if (path.startsWith("/api/secure")) {
//            String authHeader = request.getHeader("Authorization");
//            System.out.println("🔍 Authorization: " + authHeader);
//
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                String token = authHeader.substring(7);
//                if (jwtTokenUtil.validateToken(token)) {
//                    System.out.println("✅ Token hợp lệ");
//
//                    // ✅ Gán thông tin người dùng vào SecurityContext
//                    String username = jwtTokenUtil.getUsernameFromToken(token);
//                    UsernamePasswordAuthenticationToken auth =
//                            new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
//                    SecurityContextHolder.getContext().setAuthentication(auth);
//
//                    filterChain.doFilter(servletRequest, servletResponse);
//                    return;
//                } else {
//                    System.out.println("❌ Token không hợp lệ");
//                }
//            } else {
//                System.out.println("⚠️ Không có hoặc sai định dạng Authorization header");
//            }
//
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.setContentType("application/json; charset=UTF-8");
//            response.getWriter().write("{\"error\": \"Token không hợp lệ hoặc thiếu\"}");
//        } else {
//            filterChain.doFilter(servletRequest, servletResponse);
//        }
//    }
//}
