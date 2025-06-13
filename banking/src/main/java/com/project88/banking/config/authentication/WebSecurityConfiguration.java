package com.project88.banking.config.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.project88.banking.config.jwt.JwtAuthenticationFilter;
import com.project88.banking.service.IUserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

	@Autowired
	private IUserService service;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(service)
				.passwordEncoder(passwordEncoder).and().build();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().authorizeHttpRequests().requestMatchers("/uploads/**").permitAll()
				.requestMatchers("/api/v1/auth/**").permitAll().requestMatchers("/api/v1/admin/**")
				.hasAuthority("ROLE_ADMIN").requestMatchers("/api/v1/users/**")
				.hasAnyAuthority("ROLE_ADMIN", "ROLE_USER", "ROLE_EMPLOYEE").requestMatchers("/api/v1/employees/**")
				.hasAnyAuthority("ROLE_ADMIN", "ROLE_EMPLOYEE")
				.requestMatchers("/api/v1/deposits").hasAnyAuthority("ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_USER")
				.anyRequest().authenticated().and()
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOriginPattern("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
}
