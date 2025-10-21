package servesync.users.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import servesync.users.dto.*;
import servesync.users.service.UserService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UserService usuarioService;

    public UsuarioController(UserService usuarioService) {
        this.usuarioService = usuarioService;
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(usuarioService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(usuarioService.login(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.getUser(id));
    }
    @PostMapping("/password")
    public ResponseEntity<Boolean> changePassword(@RequestBody PasswordRequest request){
        return ResponseEntity.ok(usuarioService.changePassword(request));
    }
    @PostMapping("/edit")
    public ResponseEntity<UserResponse> editUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(usuarioService.editUser(request));
    }

}