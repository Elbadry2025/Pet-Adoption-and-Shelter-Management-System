package Shelter.Pet_Adoption_System.Config;

import org.springframework.boot.web.servlet.*;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.web.cors.*;
import org.springframework.web.filter.*;
import org.springframework.web.servlet.config.annotation.*;

import java.util.*;

@Configuration
@EnableWebMvc
public class CorsConfig {

    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT
        ));
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name(),
                HttpMethod.PATCH.name())
        );
        config.setMaxAge(ConfigConstants.MAX_AGE);
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

        bean.setOrder(ConfigConstants.CORS_FILTER_ORDER);
        return bean;
    }

}
