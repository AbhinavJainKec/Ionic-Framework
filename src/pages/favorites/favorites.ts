import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let alert = this.alertCtrl.create({
      title: 'Confirm Title',
      message: 'Do You Want To Delete Favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete Cancelled')
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting ....'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' Deleted Successfully',
              duration: 3000
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present() },
                errmess => { this.errMess = errmess; loading.dismiss(); }
              );
          }
        }
      ]
    });

    let loading = this.loadingCtrl.create({
      content: 'Deleting ....'
    });

    let toast = this.toastCtrl.create({
      message: 'Dish ' + id + ' Deleted Successfully',
      duration: 3000
    });

    loading.present();

    this.favoriteservice.deleteFavorite(id)
      .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present() },
        errmess => { this.errMess = errmess; loading.dismiss(); });
    
    alert.present();

    item.close();
  }

}
