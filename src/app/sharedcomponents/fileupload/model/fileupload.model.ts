export class FileOptions {
  constructor() { }
   name: string = 'noname';
   allowMultiple: boolean = false;
   containerName: string = "photos";
   userId: string;
   propertyInformationId: string;
   uploadTarget: any;
   uploadType: string;
   fileType: string = "image";
   acceptsType = "image/jpeg, image/png";
   fileExt: string = "JPG, GIF, PNG";
   directoryId: string;
   hasThumbnail: boolean = false;
   thumbnailWidth: number = 96;
   thumbnaiHeight: number = 96;
   maxFiles: number = 5;
   maxSize: number = 2; // 2MB
}
