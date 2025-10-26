package servesync.users.dto;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @NonNull
    private String rutEmpresa;
    @NonNull
    private String password;
}
