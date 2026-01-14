import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Master {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  avatar: string;
  description: string;
  phone: string;
  email: string;
}

interface FavoritesPageProps {
  favoriteMasters: Master[];
  toggleFavorite: (masterId: number) => void;
}

const FavoritesPage = ({ favoriteMasters, toggleFavorite }: FavoritesPageProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-secondary">Избранные мастера</h2>
      {favoriteMasters.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">Нет избранных мастеров</p>
          <p className="text-muted-foreground">Добавьте мастеров в избранное, чтобы быстро находить их</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMasters.map((master) => (
            <Card key={master.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={master.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {master.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(master.id)}
                  >
                    <Icon 
                      name="Heart" 
                      size={20}
                      className="fill-red-500 text-red-500"
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg">{master.name}</CardTitle>
                <CardDescription>{master.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{master.rating}</span>
                  <span className="text-sm text-muted-foreground">({master.reviews} отзывов)</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Phone" size={14} className="text-muted-foreground" />
                    <span>{master.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Mail" size={14} className="text-muted-foreground" />
                    <span>{master.email}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">{master.price}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Связаться
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
