package com.project88.banking.config.jwt;

import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtUtils {
    private final String JWT_SECRET = "e3f846876e8e50adb192a17f35369e08f29757dec3c9a9c7ae09822cc55a04ed602efd248959f0bd539f71f7890224eba2305203ea09ff01c53953c3361096a888c3b204d4df03222e1ce9ad8545ab6288278491002039670dbae556cc851e9701681272b86ec4f5b872ce44f048ba342f4f0a71599b0d4e43068596778cb782eb99b665d5b090a41eb1d9dcff250cd0985d484a06641493ac5b5668824e3e202349d080f93ccbe420f0bea7c09784cd7ee9ba379861c5891bbdedc7cccd7932226ca8830be7d46ef094d874a840d8b71428b61d2b4ea5c8ea90212df5a3e0adc091c409a263a3f74fb06e2f1579ecea5693fe42333ee1d470670d8a5031dd45";
    private final long JWT_EXPIRATION = 86400000L; // 1 day

    public String generateToken(UserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public LocalDateTime getExpiryFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        Date expiry = claims.getExpiration();
        return expiry.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
}
