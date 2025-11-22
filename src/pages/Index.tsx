import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const numberMeanings = {
  1: {
    title: 'Единица',
    description: 'Лидер, первопроходец, независимый',
    traits: 'Амбициозность, инициативность, уверенность в себе',
  },
  2: {
    title: 'Двойка',
    description: 'Дипломат, миротворец, партнер',
    traits: 'Гармония, сотрудничество, чувствительность',
  },
  3: {
    title: 'Тройка',
    description: 'Творец, коммуникатор, оптимист',
    traits: 'Креативность, общительность, жизнерадостность',
  },
  4: {
    title: 'Четверка',
    description: 'Строитель, организатор, практик',
    traits: 'Надежность, упорство, структурированность',
  },
  5: {
    title: 'Пятерка',
    description: 'Искатель приключений, свободолюбивый',
    traits: 'Любознательность, адаптивность, энергичность',
  },
  6: {
    title: 'Шестерка',
    description: 'Заботливый, ответственный, семьянин',
    traits: 'Любовь, забота, гармония в отношениях',
  },
  7: {
    title: 'Семерка',
    description: 'Мыслитель, исследователь, духовный',
    traits: 'Мудрость, аналитический ум, интуиция',
  },
  8: {
    title: 'Восьмерка',
    description: 'Материалист, бизнесмен, власть',
    traits: 'Амбициозность, успех, материальное процветание',
  },
  9: {
    title: 'Девятка',
    description: 'Гуманист, идеалист, просветитель',
    traits: 'Сострадание, широта взглядов, альтруизм',
  },
};

const calculateLifePath = (dateStr: string): number => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const sumDigits = (num: number): number => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  const reduceToSingle = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = sumDigits(num);
    }
    return num;
  };

  const daySum = reduceToSingle(day);
  const monthSum = reduceToSingle(month);
  const yearSum = reduceToSingle(year);

  const total = daySum + monthSum + yearSum;
  return reduceToSingle(total);
};

const calculateCompatibility = (num1: number, num2: number): number => {
  const compatibilityMatrix: { [key: string]: number } = {
    '1-1': 85, '1-2': 70, '1-3': 90, '1-4': 60, '1-5': 95, '1-6': 75, '1-7': 65, '1-8': 80, '1-9': 88,
    '2-2': 90, '2-3': 85, '2-4': 88, '2-5': 70, '2-6': 95, '2-7': 82, '2-8': 75, '2-9': 92,
    '3-3': 88, '3-4': 65, '3-5': 92, '3-6': 85, '3-7': 78, '3-8': 70, '3-9': 90,
    '4-4': 85, '4-5': 60, '4-6': 90, '4-7': 75, '4-8': 95, '4-9': 72,
    '5-5': 80, '5-6': 68, '5-7': 85, '5-8': 78, '5-9': 88,
    '6-6': 92, '6-7': 80, '6-8': 85, '6-9': 95,
    '7-7': 88, '7-8': 72, '7-9': 85,
    '8-8': 90, '8-9': 78,
    '9-9': 92,
  };

  const key1 = `${Math.min(num1, num2)}-${Math.max(num1, num2)}`;
  return compatibilityMatrix[key1] || 75;
};

export default function Index() {
  const [birthDate, setBirthDate] = useState('');
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);
  
  const [birthDate1, setBirthDate1] = useState('');
  const [birthDate2, setBirthDate2] = useState('');
  const [compatibility, setCompatibility] = useState<number | null>(null);

  const handleCalculate = () => {
    if (birthDate) {
      const number = calculateLifePath(birthDate);
      setLifePathNumber(number);
    }
  };

  const handleCompatibilityCalculate = () => {
    if (birthDate1 && birthDate2) {
      const num1 = calculateLifePath(birthDate1);
      const num2 = calculateLifePath(birthDate2);
      const comp = calculateCompatibility(num1, num2);
      setCompatibility(comp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Нумерология
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте тайны вашей судьбы через числа. Узнайте свое число жизненного пути и совместимость с близкими
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Calculator" className="text-primary" size={28} />
                Число судьбы
              </CardTitle>
              <CardDescription>
                Рассчитайте ваше число жизненного пути по дате рождения
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate">Дата рождения</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button onClick={handleCalculate} className="w-full text-lg h-12" size="lg">
                Рассчитать
              </Button>

              {lifePathNumber !== null && (
                <div className="mt-6 p-6 bg-primary/10 rounded-lg border-2 border-primary/20 animate-scale-in">
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-primary mb-2">{lifePathNumber}</div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {numberMeanings[lifePathNumber as keyof typeof numberMeanings]?.title}
                    </h3>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-center text-lg mb-3">
                    {numberMeanings[lifePathNumber as keyof typeof numberMeanings]?.description}
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Ключевые черты:</strong>{' '}
                    {numberMeanings[lifePathNumber as keyof typeof numberMeanings]?.traits}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Heart" className="text-accent" size={28} />
                Совместимость
              </CardTitle>
              <CardDescription>
                Проверьте совместимость двух дат рождения
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate1">Первая дата рождения</Label>
                <Input
                  id="birthdate1"
                  type="date"
                  value={birthDate1}
                  onChange={(e) => setBirthDate1(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate2">Вторая дата рождения</Label>
                <Input
                  id="birthdate2"
                  type="date"
                  value={birthDate2}
                  onChange={(e) => setBirthDate2(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button onClick={handleCompatibilityCalculate} className="w-full text-lg h-12" size="lg">
                Проверить совместимость
              </Button>

              {compatibility !== null && (
                <div className="mt-6 p-6 bg-accent/10 rounded-lg border-2 border-accent/20 animate-scale-in">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-accent mb-3">{compatibility}%</div>
                    <p className="text-lg">
                      {compatibility >= 90 && '💫 Идеальная совместимость'}
                      {compatibility >= 80 && compatibility < 90 && '❤️ Отличная совместимость'}
                      {compatibility >= 70 && compatibility < 80 && '✨ Хорошая совместимость'}
                      {compatibility < 70 && '🤝 Умеренная совместимость'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl mb-16 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="BookOpen" className="text-primary" size={28} />
              Значения чисел
            </CardTitle>
            <CardDescription>
              Узнайте, что означает каждое число жизненного пути
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(numberMeanings).map(([num, meaning]) => (
                <div
                  key={num}
                  className="p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors hover:shadow-md"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{num}</div>
                  <h4 className="font-semibold text-lg mb-1">{meaning.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{meaning.description}</p>
                  <p className="text-xs text-muted-foreground">{meaning.traits}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="HelpCircle" className="text-primary" size={28} />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">Что такое число жизненного пути?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Число жизненного пути — это ключевое число в нумерологии, которое рассчитывается на основе вашей даты рождения. 
                  Оно раскрывает ваши природные таланты, жизненную цель и основные черты характера.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Как рассчитывается число судьбы?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Число судьбы рассчитывается путем сложения всех цифр даты рождения и последующего сведения результата к одной цифре 
                  (от 1 до 9). Например: 15.03.1990 → 1+5+0+3+1+9+9+0 = 28 → 2+8 = 10 → 1+0 = 1.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">Насколько точна нумерологическая совместимость?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Нумерологическая совместимость — это один из инструментов для понимания динамики отношений. 
                  Она показывает потенциал гармонии между людьми, но не является абсолютной истиной. 
                  Успех в отношениях зависит от многих факторов, включая взаимное уважение и общие ценности.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">Можно ли изменить свое число судьбы?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Число жизненного пути остается неизменным, так как оно основано на дате рождения. 
                  Однако вы можете работать над развитием положительных качеств своего числа и минимизацией негативных черт.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Что означают мастер-числа 11, 22, 33?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Мастер-числа (11, 22, 33) — это особые числа в нумерологии, которые обладают повышенной духовной энергией 
                  и потенциалом. Они не сводятся к одной цифре и несут в себе усиленные характеристики базовых чисел.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 Нумерология. Создано для понимания языка чисел и самопознания.
          </p>
        </footer>
      </div>
    </div>
  );
}
