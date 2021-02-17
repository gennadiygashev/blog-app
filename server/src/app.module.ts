import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { dbURL } from 'secret/db.secret'
import { BlogModule } from './blog/blog.module'

@Module({
  imports: [
    MongooseModule.forRoot(dbURL, { useNewUrlParser: true }),
    BlogModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
