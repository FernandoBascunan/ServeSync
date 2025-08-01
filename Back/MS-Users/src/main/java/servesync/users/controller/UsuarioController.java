package servesync.users.controller;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class UsuarioController {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empresaID;
    @Column(nullable = false)
    private String nombre;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
}
