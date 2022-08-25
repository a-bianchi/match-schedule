import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from './common/decorators';

@Controller({
  version: VERSION_NEUTRAL,
})
@Controller()
export class PingController {
  //PING
  @Public()
  @Get('/ping')
  ping() {
    return 'OK';
  }
}
