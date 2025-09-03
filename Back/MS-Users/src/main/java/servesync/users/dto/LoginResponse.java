package servesync.users.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {
    Long privateKey;
    private String username;
    private String token;
    private boolean success;
    public LoginResponse(Long id, String nombreEmpresa, String token, boolean success) {
        this.privateKey = id;
        this.username = nombreEmpresa;
        this.token = token;
        this.success = success;
    }
}
