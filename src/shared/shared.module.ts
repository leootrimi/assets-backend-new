import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ApiRequest } from "src/utility/ApiRequest";
import { Auth0Utility } from "src/utility/Auth0Utility";

@Module({
  imports: [HttpModule],
  providers: [ApiRequest, Auth0Utility],
  exports: [ApiRequest, Auth0Utility],
})
export class SharedModule {}