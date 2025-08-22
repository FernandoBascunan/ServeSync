package servesync.users.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;

@Entity
@Table(name= "Usuario")
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nombreEmpresa;
    @Column(unique = true)
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
    private long tokenVersion = 0;
    private Boolean activo= true;

}
