import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/ui/CodeBlock';

export default function DocsTabs({ tabs }) {
  return (
    <Tabs defaultValue={tabs[0]?.id} className="w-full">
      <TabsList className="bg-slate-800 border border-slate-700">
        {tabs.map(tab => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          <CodeBlock code={tab.code} language={tab.language} title={tab.title} />
        </TabsContent>
      ))}
    </Tabs>
  );
}