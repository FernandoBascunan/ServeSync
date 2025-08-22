package servesync.users.dto;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nombreEmpresa;
    @Id
    private String rutEmpresa;
    private String correo;
    private String direccion;
    private String telefono;
    @CreatedDate
    private LocalDate fechaRegistro;
    @LastModifiedDate
    private LocalDate fechaActualizacion;
    private String nombreUsuario;
    private String rut;
    private String password;
    private Boolean activo= true;

}
