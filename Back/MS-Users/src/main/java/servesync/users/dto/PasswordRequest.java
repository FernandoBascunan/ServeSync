package servesync.users.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PasswordRequest{
    private String rutEmpresa;
    private String newPassword;
}
