package servesync.users.dto;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

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
