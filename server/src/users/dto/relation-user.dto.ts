import validator from 'validator';
import { IsIn, ValidateIf } from 'class-validator';

export class RelationUserDto {
  @ValidateIf((o) => validator.isMongoId(o))
  likerId: string;

  @ValidateIf((o) => validator.isMongoId(o))
  targetId: string;

  @IsIn(['like', 'dislike'])
  action: string;
}
