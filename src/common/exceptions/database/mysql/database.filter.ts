import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
import * as DBErrorCodes from './database.exception.codes';

@Catch(QueryFailedError, EntityNotFoundError)
export class DataBaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let httpStatucode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (exception as any).message.message;
    let userReadableMessage = 'And error was ocurred';
    let libraryCode = 'DatabaseException';
    let internaleCode = DBErrorCodes.DB_ERROR;

    switch (exception.constructor) {
      case QueryFailedError:
        libraryCode = (exception as any).code;
        switch (libraryCode) {
          case 'ER_DUP_ENTRY':
            httpStatucode = HttpStatus.UNPROCESSABLE_ENTITY;
            message = (exception as QueryFailedError).message;
            libraryCode = (exception as any).code;
            internaleCode = DBErrorCodes.DUPLICATED_ENTRY;
            userReadableMessage = '';
            break;
          default:
            httpStatucode = HttpStatus.BAD_REQUEST;
            message = (exception as QueryFailedError).message;
            libraryCode = (exception as any).code;
            internaleCode = DBErrorCodes.DB_ERROR;
            break;
        }

        break;
      case EntityNotFoundError:
        httpStatucode = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        libraryCode = (exception as any).code;
        internaleCode = DBErrorCodes.NOT_FOUND;
        userReadableMessage = 'We can not find what you looking for';
        break;
      case CannotCreateEntityIdMapError:
        httpStatucode = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        libraryCode = (exception as any).code;
        internaleCode = DBErrorCodes.NOT_FOUND;
        userReadableMessage = 'We can not find what you looking for';
        break;
      default:
        httpStatucode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    Logger.error(
      message,
      internaleCode,
      libraryCode,
      (exception as any).stack,
      ` ${request.method} ${request.url}`,
    );

    Logger.error((exception as QueryFailedError).driverError);
    Logger.error((exception as QueryFailedError).parameters);
    Logger.error((exception as QueryFailedError).query);

    response.status(httpStatucode).json({
      error: userReadableMessage,
      code: internaleCode,
    });
  }
}
