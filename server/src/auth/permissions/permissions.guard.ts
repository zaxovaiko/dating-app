import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    throw new Error('Method not implemented.');
    // TODO: Add permision for user actions
  }
}
