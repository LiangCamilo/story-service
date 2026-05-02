import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from 'src/config/cloudinary.config';
import { UploadedCoverDto } from 'src/story/application/dtos/story-dtos/uploaded-cover.dto';
import { CloudinaryFileNotFound } from './error/cloudinary-buffer-not-found';
import { CloudinaryError } from './error/cloudinary.error';
import { CloudinaryDeleteError } from './error/cloudinary-delete.error';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(
    @Inject(cloudinaryConfig.KEY)
    private readonly dbEnvs: ConfigType<typeof cloudinaryConfig>,
  ) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.dbEnvs.cloudinaryCloudName,
      api_secret: this.dbEnvs.cloudinaryApiSecret,
      api_key: this.dbEnvs.cloudinaryApiKey,
      secure: true,
    });
  }

  async uploadImageToCloudinary(
    uploadedCoverDto: UploadedCoverDto,
    publicId?: string,
  ) {
    return new Promise((resolve, reject) => {
      if (!uploadedCoverDto.buffer) {
        return reject(new CloudinaryFileNotFound());
      }

      const uploadOptions = {
        resource_type: 'image' as const,
        overwrite: true,
        invalidate: true,
        ...(publicId ? { public_id: publicId } : {}),
      };

      const uploadedStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(
              new CloudinaryError({
                message: 'Error mientras se subía la imagen',
              }),
            );
          }

          if (!result) {
            return reject(
              new CloudinaryError({
                message: 'Cloudinary no pudo responder',
              }),
            );
          }

          resolve(result);
        },
      );

      uploadedStream.end(uploadedCoverDto.buffer);
    });
  }

  async deleteFromCloudinary(publicId: string): Promise<void> {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new CloudinaryDeleteError();
    }
  }
}
