import { Application } from '../declarations';
import securityUser from './security/user/user.service';
import securityAccount from './security/account/account.service';
import securityRole from './security/role/role.service';
import dataTag from './data/tag/tag.service';
import securitySession from './security/session/session.service';
import storageFile from './storage/file/file.service';
import insuranceDeal from './insurance/deal/deal.service';
import insuranceAccess from './insurance/access/access.service';
import insuranceDetail from './insurance/detail/detail.service';
import insuranceFollowing from './insurance/following/following.service';
import communicationMessage from './communication/message/message.service';
import marketNote from './market/note/note.service';
import marketContact from './market/contact/contact.service';
import marketList from './market/list/list.service';
import insuranceTimeline from './insurance/timeline/timeline.service';
import storageS3 from './storage/s3/s3.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(securityUser);
  app.configure(securityAccount);
  app.configure(securityRole);
  app.configure(dataTag);
  app.configure(securitySession);
  app.configure(storageFile);
  app.configure(insuranceDeal);
  app.configure(insuranceAccess);
  app.configure(insuranceDetail);
  app.configure(insuranceFollowing);
  app.configure(communicationMessage);
  app.configure(marketNote);
  app.configure(marketContact);
  app.configure(marketList);
  app.configure(insuranceTimeline);
  app.configure(storageS3);
}
