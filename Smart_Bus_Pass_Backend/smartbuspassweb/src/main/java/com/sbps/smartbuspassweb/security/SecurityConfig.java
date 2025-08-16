//package com.sbps.smartbuspassweb.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
////
////import org.springframework.context.annotation.*;
////import org.springframework.security.authentication.*;
////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.*;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.*;
////
////@Configuration
////@EnableWebSecurity
////public class SecurityConfig {
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
////        return config.getAuthenticationManager();
////    }
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        return http.csrf().disable()
////            .authorizeHttpRequests(auth -> auth
////                .requestMatchers("/api/auth/**").permitAll()
////                .anyRequest().authenticated())
////            .build();
////    }
////}
//
//@Configuration
//public class SecurityConfig {
//
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//		return config.getAuthenticationManager();
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	public AuthenticationProvider authenticationProvider(CustomUserDetailsService userDetailsService) {
//		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//		authProvider.setUserDetailsService(userDetailsService);
//		authProvider.setPasswordEncoder(passwordEncoder());
//		return authProvider;
//	}
//
////	@Bean
////	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////		http.cors() // Enable CORS
////				.and().csrf().disable().authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**").permitAll()
//////	    .requestMatchers(HttpMethod.POST, "/api/passes/**").authenticated()
////						.anyRequest().authenticated());
////		return http.build();
////	}
//
//	@Autowired
//	private JwtAuthenticationFilter jwtAuthenticationFilter;
//
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.cors().and().csrf().disable()
//				.authorizeHttpRequests(
//						auth -> auth.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated())
//				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//		return http.build();
//	}
//
////	   @Bean
////	    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
////	        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
////	        configuration.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
////	        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
////	        configuration.setAllowedHeaders(java.util.List.of("*"));
////	        configuration.setAllowCredentials(true);
////
////	        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
////	        source.registerCorsConfiguration("/**", configuration);
////	        return source;
////	    }
//
//}



//==========================================================



package com.sbps.smartbuspassweb.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//
//import org.springframework.context.annotation.*;
//import org.springframework.security.authentication.*;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.*;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.*;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http.csrf().disable()
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/auth/**").permitAll()
//                .anyRequest().authenticated())
//            .build();
//    }
//}

@Configuration
public class SecurityConfig {

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider(CustomUserDetailsService userDetailsService) {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.cors() // Enable CORS
//				.and().csrf().disable().authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**").permitAll()
////	    .requestMatchers(HttpMethod.POST, "/api/passes/**").authenticated()
//						.anyRequest().authenticated());
//		return http.build();
//	}

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
				.authorizeHttpRequests(
						auth -> auth
						
						.requestMatchers(
			                    "/api/auth/**",         // Public auth APIs
			                    "/api/passes/**"       // ✅ Make QR access public
			                                    // Optional: test route
			                ).permitAll()
						.anyRequest().authenticated())
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

//	   @Bean
//	    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
//	        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
//	        configuration.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
//	        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	        configuration.setAllowedHeaders(java.util.List.of("*"));
//	        configuration.setAllowCredentials(true);
//
//	        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
//	        source.registerCorsConfiguration("/**", configuration);
//	        return source;
//	    }

}
