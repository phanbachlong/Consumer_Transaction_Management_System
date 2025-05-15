//package com.project88.banking.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtTokenUtil {
//
//    private final String SECRET_KEY = "minh-java-spring-jwt";
//    private final long EXPIRATION = 24 * 60 * 60 * 1000; // 24 giờ
//    private final long REFRESH_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 ngày
//
//    // ✅ Tạo Access Token
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                .compact();
//    }
//
//    // ✅ Tạo Refresh Token
//    public String generateRefreshToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                .compact();
//    }
//
//    // ✅ Kiểm tra Access Token hợp lệ
//    public boolean validateToken(String token) {
//        try {
//            Claims claims = getClaims(token);
//            return claims.getExpiration().after(new Date());
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    // ✅ Kiểm tra Refresh Token hợp lệ
//    public boolean validateRefreshToken(String token) {
//        return validateToken(token);
//    }
//
//    // ✅ Lấy username từ token
//    public String getUsernameFromToken(String token) {
//        return getClaims(token).getSubject();
//    }
//
//    private Claims getClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//}
