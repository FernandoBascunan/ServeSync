package servesync.users.service;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import servesync.users.config.JwtUtil;
import servesync.users.domain.User;
import servesync.users.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import servesync.users.repository.UserRepository;

import java.time.LocalDate;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserResponse getUser(Long id) {
        logger.info("Recuperando la información del usuario con ID: {}...", id);
        return userRepository.findById(id)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getNombreEmpresa(),
                        user.getRutEmpresa(),
                        user.getCorreo(),
                        user.getDireccion(),
                        user.getTelefono(),
                        user.getFechaRegistro(),
                        user.getFechaActualizacion(),
                        user.getNombreUsuario(),
                        user.getRut(),
                        user.getPassword(),
                        user.getActivo()

                ))
                .orElse(null);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        logger.info("Iniciando solicitud de login...");
        logger.info("Buscando usuario con rutEmpresa: '{}'", request.getRutEmpresa());
        //  Buscar usuario en la BD
        User user = userRepository.findByRutEmpresa(request.getRutEmpresa());

        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        //  Validar contraseña
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        //  Generar Token
        String token = jwtUtil.generateToken(user.getNombreEmpresa(), user.getId());
        logger.info("Token generado: {}", token);
        //  Retornar DTO con token
        return new LoginResponse(user.getId(), user.getNombreEmpresa(), token,true);
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        logger.info("Iniciando solicitud de registro...");
        // Verificar si existe el usuario
        if(userRepository.findByRutEmpresa(request.getRutEmpresa())!=null){
            throw new RuntimeException("Ya existe un usuario con ese rut");
        }
        // Crear el usuario
        User user = new User();
        user.setNombreEmpresa(request.getNombreEmpresa());
        user.setRutEmpresa(request.getRutEmpresa());
        user.setCorreo(request.getCorreo());
        user.setDireccion(request.getDireccion());
        user.setTelefono(request.getTelefono());
        user.setNombreUsuario(request.getNombreUsuario());
        user.setRut(request.getRut());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActivo(true);
        // Guardar el usuario
        User savedUser = userRepository.save(user);
        LocalDate ahora = LocalDate.now();
        user.setFechaRegistro(ahora);
        user.setFechaActualizacion(ahora);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getNombreEmpresa(),
                savedUser.getRutEmpresa(),
                savedUser.getCorreo(),
                savedUser.getDireccion(),
                savedUser.getTelefono(),
                savedUser.getFechaRegistro(),
                savedUser.getFechaActualizacion(),
                savedUser.getNombreUsuario(),
                savedUser.getRut(),
                savedUser.getPassword(),
                savedUser.getActivo()
        );
    }

    @Override
    public Boolean changePassword(PasswordRequest request) {
        logger.info("Iniciando solicitud de cambio de contraseña...");
        if(userRepository.findByRutEmpresa(request.getRutEmpresa())==null){
            throw new RuntimeException("No existe usuario con ese rut");
        }
        User user= userRepository.findByRutEmpresa(request.getRutEmpresa());
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        logger.info("Se ha actualizado la contraseña");
        return true;

    }
    @Override
    public UserResponse editUser(RegisterRequest request) {
        logger.info("Editando la información del usuario...");

        User user = userRepository.findByRutEmpresa(request.getRutEmpresa());
        user.setNombreEmpresa(request.getNombreEmpresa());
        user.setCorreo(request.getCorreo());
        user.setDireccion(request.getDireccion());
        user.setTelefono(request.getTelefono());
        user.setFechaActualizacion(request.getFechaActualizacion());
        user.setNombreUsuario(request.getNombreUsuario());
        user.setActivo(true);
        LocalDate ahora = LocalDate.now();
        user.setFechaActualizacion(ahora);

        // Guardar el usuario
        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getNombreEmpresa(),
                savedUser.getRutEmpresa(),
                savedUser.getCorreo(),
                savedUser.getDireccion(),
                savedUser.getTelefono(),
                savedUser.getFechaRegistro(),
                savedUser.getFechaActualizacion(),
                savedUser.getNombreUsuario(),
                savedUser.getRut(),
                savedUser.getPassword(),
                savedUser.getActivo()
        );

    }
}
