package servesync.users.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    PrivateKey privateKey;
    private String username;
    private String token;
    private boolean success;

    public LoginResponse(long id, String nombreEmpresa, String correo, String token, boolean b) {
    }
}
