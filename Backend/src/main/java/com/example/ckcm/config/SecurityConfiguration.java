package com.example.ckcm.config;

import com.example.ckcm.entities.Role;
import com.example.ckcm.entities.User;
import com.example.ckcm.repositories.UserRepository;
import com.example.ckcm.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository; // Inject UserRepository

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/resources/**").permitAll()
                .requestMatchers("/users/**").authenticated()
                .anyRequest().authenticated()
        );

        // OAuth2 Login configuration
        http.oauth2Login(oauth2 -> oauth2.loginPage("/auth/login")
                .userInfoEndpoint(userInfo -> userInfo
                        .oidcUserService(new OidcUserService())
                        .userService(new DefaultOAuth2UserService()))
                .successHandler(oAuth2LoginSuccessHandler()) // Custom success handler
        );

        // Enforce stateless session management
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authenticationProvider(authenticationProvider);
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Custom OAuth2 success handler
    @Bean
    public SimpleUrlAuthenticationSuccessHandler oAuth2LoginSuccessHandler() {
        return new SimpleUrlAuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                org.springframework.security.core.Authentication authentication)
                    throws IOException, ServletException {

                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                String email = oAuth2User.getAttribute("email");  // Extract email
                String firstName = oAuth2User.getAttribute("given_name"); // First name
                String lastName = oAuth2User.getAttribute("family_name"); // Last name

                // Check if user exists in DB
                Optional<User> existingUser = userRepository.findByEmail(email);

                User user;
                if (existingUser.isEmpty()) {
                    // Save new user
                    user = User.builder()
                            .firstName(firstName != null ? firstName : "OAuthUser")
                            .lastName(lastName != null ? lastName : "")
                            .email(email)
                            .password("") // No password needed for OAuth users
                            .role(Role.USER) // Default role
                            .build();
                    userRepository.save(user);
                } else {
                    user = existingUser.get();
                }

                // Generate JWT Token using your JwtService
                String token = jwtService.generateToken(user);

                // Redirect to /users with the token as a query parameter
                response.sendRedirect("/users?token=" + token);
            }
        };
    }
}
