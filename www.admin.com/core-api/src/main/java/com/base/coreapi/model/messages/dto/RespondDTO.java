package com.base.coreapi.model.messages.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RespondDTO {

    private Long userId;

    private String messageContent;
}
