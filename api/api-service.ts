
import { mockOrgData, mockJobData, mockEmployeeData, mockJobDutyData, mockJobDutyCategoryData, mockPerformanceData, mockEsignTemplates, mockVisitRecords, mockRetroRules } from '../mock/mock-data';
import { IOrgNode, IJobPosition, IEmployee, IJobDuty, IJobDutyCategory, IAiCandidate, IPerformanceIndicator, IEsignTemplate, IVisitRecord, IRetroRule } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

const STORAGE_KEYS = {
  ORG: 'aiflow_org_data',
  POSITIONS: 'aiflow_positions_data',
  DUTIES: 'aiflow_duties_data',
  CATEGORIES: 'aiflow_categories_data',
  EMPLOYEES: 'aiflow_employees_data',
  PERFORMANCE: 'aiflow_performance_data',
  ESIGN_TEMPLATES: 'aiflow_esign_templates',
  VISIT_RECORDS: 'aiflow_visit_records',
  RETRO_RULES: 'aiflow_retro_rules'
};

const initStorage = () => {
    if (typeof window === 'undefined') return;
    
    if (!localStorage.getItem(STORAGE_KEYS.ORG)) {
        localStorage.setItem(STORAGE_KEYS.ORG, JSON.stringify(mockOrgData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.POSITIONS)) {
        localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(mockJobData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DUTIES)) {
        localStorage.setItem(STORAGE_KEYS.DUTIES, JSON.stringify(mockJobDutyData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(mockJobDutyCategoryData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
        localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(mockEmployeeData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PERFORMANCE)) {
        localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(mockPerformanceData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ESIGN_TEMPLATES)) {
        localStorage.setItem(STORAGE_KEYS.ESIGN_TEMPLATES, JSON.stringify(mockEsignTemplates));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VISIT_RECORDS)) {
        localStorage.setItem(STORAGE_KEYS.VISIT_RECORDS, JSON.stringify(mockVisitRecords));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RETRO_RULES)) {
        localStorage.setItem(STORAGE_KEYS.RETRO_RULES, JSON.stringify(mockRetroRules));
    }
};

initStorage();

export const ApiService = {
  getOrgStructure: async (): Promise<IOrgNode[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORG) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createOrgNode: async (nodeData: any): Promise<IOrgNode> => {
     const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORG) || '[]');
     
     const newNode: IOrgNode = {
        id: Date.now().toString(),
        name: nodeData.name,
        type: nodeData.type as any,
        level: 0,
        headcountCurrent: 0,
        headcountTotal: parseInt(nodeData.headcount) || 0,
        establishmentCurrent: 0,
        establishmentTotal: parseInt(nodeData.headcount) || 0,
        manager: nodeData.manager,
        concurrentCount: 0,
        expanded: false,
        children: [],
        code: nodeData.code,
        shortName: nodeData.shortName,
        storeNumber: nodeData.storeNumber,
        attribute: nodeData.attribute,
        description: nodeData.description,
        remark: nodeData.remark,
        isVirtual: nodeData.isVirtual === '是',
     };

     const addToParent = (nodes: IOrgNode[], parentName: string): boolean => {
        for (const node of nodes) {
            if (node.name === parentName) {
                if (!node.children) node.children = [];
                newNode.level = node.level + 1;
                node.children.push(newNode);
                node.expanded = true;
                return true;
            }
            if (node.children) {
                if (addToParent(node.children, parentName)) return true;
            }
        }
        return false;
     };

     let added = false;
     if (nodeData.parentOrg) {
         added = addToParent(data, nodeData.parentOrg);
     }
     
     if (!added) {
         // Default to root if not found or no parent specified
         newNode.level = 0;
         data.push(newNode);
     }

     localStorage.setItem(STORAGE_KEYS.ORG, JSON.stringify(data));
     return new Promise((resolve) => setTimeout(() => resolve(newNode), 100));
  },
  
  getJobPositions: async (): Promise<IJobPosition[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSITIONS) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createJobPosition: async (position: any): Promise<IJobPosition> => {
     const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSITIONS) || '[]');
     const newPosition = { ...position, id: Date.now().toString(), status: '启用' };
     data.unshift(newPosition);
     localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(data));
     return new Promise((resolve) => setTimeout(() => resolve(newPosition), 100));
  },

  updateJobPosition: async (position: any): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSITIONS) || '[]');
      const index = data.findIndex((item: any) => item.id === position.id);
      if (index !== -1) {
          data[index] = { ...data[index], ...position };
          localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(data));
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  getJobDuties: async (): Promise<IJobDuty[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.DUTIES) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createJobDuty: async (duty: any): Promise<IJobDuty> => {
     const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.DUTIES) || '[]');
     const newDuty = { ...duty, id: Date.now().toString() };
     data.unshift(newDuty);
     localStorage.setItem(STORAGE_KEYS.DUTIES, JSON.stringify(data));
     return new Promise((resolve) => setTimeout(() => resolve(newDuty), 100));
  },

  updateJobDuty: async (duty: any): Promise<void> => {
     const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.DUTIES) || '[]');
     const index = data.findIndex((item: any) => item.id === duty.id);
     if (index !== -1) {
         data[index] = { ...data[index], ...duty };
         localStorage.setItem(STORAGE_KEYS.DUTIES, JSON.stringify(data));
     }
     return new Promise((resolve) => setTimeout(resolve, 100));
  },

  getJobDutyCategories: async (): Promise<IJobDutyCategory[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createJobDutyCategory: async (category: any): Promise<IJobDutyCategory> => {
     const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
     const newCategory = { ...category, id: Date.now().toString() };
     data.unshift(newCategory);
     localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data));
     return new Promise((resolve) => setTimeout(() => resolve(newCategory), 100));
  },

  updateJobDutyCategory: async (category: any): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
      const index = data.findIndex((item: any) => item.id === category.id);
      if (index !== -1) {
          data[index] = { ...data[index], ...category };
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data));
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  getEmployees: async (): Promise<IEmployee[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  getPerformanceIndicators: async (): Promise<IPerformanceIndicator[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERFORMANCE) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createPerformanceIndicator: async (indicator: Partial<IPerformanceIndicator>): Promise<IPerformanceIndicator> => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERFORMANCE) || '[]');
    const newIndicator = { 
        ...indicator, 
        id: Date.now().toString(),
        code: `KPI-${String(data.length + 1).padStart(4, '0')}` // Simple auto-numbering
    } as IPerformanceIndicator;
    data.push(newIndicator);
    localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(data));
    return new Promise((resolve) => setTimeout(() => resolve(newIndicator), 100));
  },

  updatePerformanceIndicator: async (indicator: IPerformanceIndicator): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERFORMANCE) || '[]');
      const index = data.findIndex((item: any) => item.id === indicator.id);
      if (index !== -1) {
          data[index] = { ...data[index], ...indicator };
          localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(data));
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  deletePerformanceIndicator: async (id: string): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERFORMANCE) || '[]');
      const newData = data.filter((item: any) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(newData));
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  getEsignTemplates: async (): Promise<IEsignTemplate[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ESIGN_TEMPLATES) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  updateEsignTemplate: async (template: IEsignTemplate): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ESIGN_TEMPLATES) || '[]');
      const index = data.findIndex((item: any) => item.id === template.id);
      if (index !== -1) {
          data[index] = { ...data[index], ...template };
          localStorage.setItem(STORAGE_KEYS.ESIGN_TEMPLATES, JSON.stringify(data));
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  // Visit Records APIs
  getVisitRecords: async (): Promise<IVisitRecord[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISIT_RECORDS) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createVisitRecord: async (record: Partial<IVisitRecord>): Promise<IVisitRecord> => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISIT_RECORDS) || '[]');
    const newRecord = { 
        ...record, 
        id: Date.now().toString(),
    } as IVisitRecord;
    data.unshift(newRecord); // Add to top
    localStorage.setItem(STORAGE_KEYS.VISIT_RECORDS, JSON.stringify(data));
    return new Promise((resolve) => setTimeout(() => resolve(newRecord), 100));
  },

  // Retro Rules APIs
  getRetroRules: async (): Promise<IRetroRule[]> => {
    initStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.RETRO_RULES) || '[]');
    return new Promise((resolve) => setTimeout(() => resolve(data), 100));
  },

  createRetroRule: async (rule: Partial<IRetroRule>): Promise<IRetroRule> => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.RETRO_RULES) || '[]');
    const newRule = {
        ...rule,
        id: Date.now().toString(),
        createTime: new Date().toLocaleString('zh-CN', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-'),
        creator: '当前用户',
    } as IRetroRule;
    data.unshift(newRule);
    localStorage.setItem(STORAGE_KEYS.RETRO_RULES, JSON.stringify(data));
    return new Promise((resolve) => setTimeout(() => resolve(newRule), 100));
  },

  updateRetroRule: async (rule: IRetroRule): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.RETRO_RULES) || '[]');
      const index = data.findIndex((item: any) => item.id === rule.id);
      if (index !== -1) {
          data[index] = { ...data[index], ...rule };
          localStorage.setItem(STORAGE_KEYS.RETRO_RULES, JSON.stringify(data));
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  deleteRetroRule: async (id: string): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.RETRO_RULES) || '[]');
      const newData = data.filter((item: any) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.RETRO_RULES, JSON.stringify(newData));
      return new Promise((resolve) => setTimeout(resolve, 100));
  },

  batchGenerateVisitRecordField: async (items: {id: string, context: any}[], targetField: string, userPrompt?: string): Promise<{id: string, value: string}[]> => {
    const runMock = () => new Promise<{id: string, value: string}[]>(resolve => {
        setTimeout(() => {
            const results = items.map(item => {
                let val = "";
                const ctx = item.context;
                const suffix = userPrompt ? ` [指令: ${userPrompt}]` : '';
                if (targetField === 'minutes') {
                    val = `与${ctx.customerName}进行了友好会谈，确认了初步意向。${suffix}`;
                } else if (targetField === 'todos') {
                    val = `1. 跟进${ctx.customerName}的需求。\n2. 发送相关资料。${suffix}`;
                } else if (targetField === 'plan') {
                    val = `计划于下周再次拜访${ctx.customerName}，推进合同签署。${suffix}`;
                }
                return { id: item.id, value: val };
            });
            resolve(results);
        }, 1500);
    });

    if (!process.env.API_KEY) {
        return runMock();
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            You are an intelligent assistant for a Customer Visit Management system.
            Your task is to generate content for the column "${targetField}" for a list of visit records.
            
            Input Data (JSON array):
            ${JSON.stringify(items.map(i => ({ id: i.id, ...i.context })))}
            
            ${userPrompt ? `User Instruction: "${userPrompt}"\nPlease strictly follow the user instruction when generating content.` : ''}
            
            For each record, analyze the existing fields (customerName, visitDate, minutes, todos, plan).
            Generate the missing or improved content for "${targetField}" based on the other fields.
            
            - If generating 'minutes' (Meeting Minutes): Create a plausible summary of a meeting based on the customer name and any existing todos/plans. If empty, invent a generic business meeting scenario suitable for a CRM system sales visit.
            - If generating 'todos' (Todos): Create actionable items based on the minutes.
            - If generating 'plan' (Follow-up Plan): Create a next step plan based on the minutes and todos.
            
            Constraint:
            - Keep it professional and concise.
            - Return a JSON array where each object has "id" (matching input) and "value" (the generated text).
            - Language: Chinese (Simplified).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            value: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        
        return JSON.parse(response.text || "[]");
    } catch (e) {
        console.error("Batch generation failed, falling back to mock:", e);
        return runMock();
    }
  },

  parseVisitRecordFromText: async (text: string): Promise<any> => {
    const runMock = () => new Promise(resolve => {
         setTimeout(() => {
             resolve({
                 customerName: 'AI 生成客户',
                 visitDate: new Date().toISOString().split('T')[0],
                 minutes: '根据提示生成的会议纪要：' + text,
                 todos: '自动生成的待办',
                 plan: '自动生成的计划'
             });
         }, 1000);
     });

    if (!process.env.API_KEY) {
         return runMock();
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            Extract or generate customer visit record information from the user prompt.
            User Prompt: "${text}"
            
            Return JSON with fields:
            - customerName (string, if not clear, infer one)
            - visitDate (YYYY-MM-DD string, default to today if not specified)
            - minutes (string, summary of meeting, infer if not present)
            - todos (string, action items, infer if not present)
            - plan (string, next steps, infer if not present)
            
            Language: Chinese (Simplified).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        customerName: { type: Type.STRING },
                        visitDate: { type: Type.STRING },
                        minutes: { type: Type.STRING },
                        todos: { type: Type.STRING },
                        plan: { type: Type.STRING }
                    }
                }
            }
        });

        return JSON.parse(response.text || "{}");
    } catch (e) {
        console.error("AI Record Generation failed, falling back to mock:", e);
        return runMock();
    }
  },

  generateOrgAIContent: async (formData: any): Promise<{ description: string }> => {
    const runMock = () => new Promise<{ description: string }>((resolve) => {
        setTimeout(() => resolve({
          description: `${formData.name}是公司核心架构的重要组成部分。根据其${formData.type}的定位，主要负责承接公司战略目标在${formData.location || '相关区域'}的落地执行。该组织下设编制${formData.headcount || '若干'}人，旨在通过高效的资源配置，提升业务响应速度与运营效率。`,
        }), 1500);
    });

    if (!process.env.API_KEY) {
      console.warn("API Key not found. Returning mock AI response.");
      return runMock();
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        你需要作为一名资深的人力资源专家，根据提供的组织信息撰写一份专业的“组织描述”。
        
        当前已有信息：
        ${JSON.stringify(formData, null, 2)}
        
        要求：
        1. **组织描述**：约100-150字。语言专业、正式。结合“组织名称”、“组织类别”、“职能定位”等信息进行润色。如果信息较少，请根据组织名称进行合理的职能推测和扩充。
        2. 请使用中文回答。
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: {
                type: Type.STRING,
                description: 'Generated professional organization description.',
              },
            },
            required: ['description'],
          },
        },
      });

      const jsonStr = response.text || "{}";
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("AI Generation failed, falling back to mock:", error);
      return runMock();
    }
  },

  parseOrgInfoFromText: async (text: string): Promise<any> => {
      const result = await ApiService.parseBusinessIntent(text, 'ORG');
      return result.data;
  },

  parseBusinessIntent: async (text: string, forcedType?: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'RETRO_RULE'): Promise<{ type: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'RETRO_RULE' | 'AMBIGUOUS' | 'MULTI_OPTIONS' | 'MULTI_CANDIDATES', data: any, options?: string[], candidates?: IAiCandidate[] }> => {
    
    const runMock = () => new Promise<any>((resolve) => {
            setTimeout(() => {
                // Mock logic for multi-intent detection
                if (!forcedType && (text.includes('和') || text.includes('以及') || text.includes('并且') || (text.includes('部门') && text.includes('职位')))) {
                    
                    const candidates: IAiCandidate[] = [];
                    // Simple mock parser
                    if (text.includes('产品部')) candidates.push({ type: 'ORG', name: '产品部' });
                    else if (text.includes('部门')) candidates.push({ type: 'ORG', name: '新部门' });
                    
                    if (text.includes('产品经理')) candidates.push({ type: 'POSITION', name: '产品经理' });
                    else if (text.includes('职位')) candidates.push({ type: 'POSITION', name: '新职位' });

                    if (candidates.length === 0) {
                         // Fallback for ambiguity without specific keywords
                         resolve({
                            type: 'AMBIGUOUS',
                            data: null,
                            options: ['创建组织', '创建职位'] // Mock options
                        });
                        return;
                    }

                    resolve({
                        type: 'MULTI_CANDIDATES',
                        data: null,
                        candidates: candidates
                    });
                    return;
                }

                const isPos = text.includes('职位') || text.includes('工程师') || text.includes('经理');
                const isDuty = text.includes('职务') && !isPos;
                const isCat = text.includes('分类') || text.includes('类别');
                const isRetro = text.includes('补卡') || text.includes('规则');
                
                if (forcedType === 'ORG' || (!forcedType && (text.includes('部门') || text.includes('公司')))) {
                    resolve({
                        type: 'ORG',
                        data: {
                            name: text.replace(/创建|部门|一个|公司/g, '').trim() + '部',
                            type: '部门',
                            parentOrg: '许波波测试公司',
                            headcount: '10',
                            description: `根据描述生成的组织：${text}`
                        }
                    });
                } else if (forcedType === 'POSITION' || (!forcedType && isPos)) {
                    resolve({
                        type: 'POSITION',
                        data: {
                            name: text.replace(/创建|职位|一个/g, '').trim(),
                            headcount: '1',
                            department: '产品部'
                        }
                    });
                } else if (forcedType === 'DUTY' || (!forcedType && isDuty)) {
                    resolve({
                        type: 'DUTY',
                        data: {
                            name: text.replace(/创建|职务|一个/g, '').trim(),
                            code: 'DUTY_001'
                        }
                    });
                } else if (forcedType === 'CATEGORY' || (!forcedType && isCat)) {
                     resolve({
                        type: 'CATEGORY',
                        data: {
                            name: text.replace(/创建|分类|一个/g, '').trim(),
                            code: 'CAT_001'
                        }
                    });
                } else if (forcedType === 'RETRO_RULE' || (!forcedType && isRetro)) {
                    resolve({
                        type: 'RETRO_RULE',
                        data: {
                            ruleName: text.replace(/创建|规则|补卡/g, '').trim() || '新补卡规则',
                            scope: 'all',
                            monthlyLimit: '3',
                            allowRetro: true,
                            retroType: 'unlimited',
                            onlyWorkHours: true,
                            promptType: 'month'
                        }
                    });
                } else {
                    resolve({ type: 'AMBIGUOUS', data: null, options: ['创建组织', '创建职位', '创建职务', '创建补卡规则'] });
                }
            }, 1000);
    });

    if (!process.env.API_KEY) {
        console.warn("API Key not found. Returning mock AI parsing.");
        return runMock();
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        let systemInstruction = "";
        let schema: any = {};
        
        // Schema Definitions
        const orgSchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, type: { type: Type.STRING, enum: ['公司', '部门', '门店'] }, parentOrg: { type: Type.STRING }, headcount: { type: Type.STRING }, manager: { type: Type.STRING }, description: { type: Type.STRING }, location: { type: Type.STRING }, attribute: { type: Type.STRING } } };
        const positionSchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, code: { type: Type.STRING }, department: { type: Type.STRING }, headcount: { type: Type.STRING }, effectiveDate: { type: Type.STRING }, qualifications: { type: Type.STRING }, responsibilities: { type: Type.STRING } } };
        const dutySchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, code: { type: Type.STRING }, shortName: { type: Type.STRING }, category: { type: Type.STRING }, jobGrade: { type: Type.STRING }, description: { type: Type.STRING } } };
        const categorySchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, code: { type: Type.STRING }, description: { type: Type.STRING } } };
        
        // Enhanced Retro Rule Schema
        const retroSchema = { 
            type: Type.OBJECT, 
            properties: { 
                ruleName: { type: Type.STRING }, 
                scope: { type: Type.STRING, enum: ['all', 'partial'] },
                allowRetro: { type: Type.BOOLEAN },
                retroType: { type: Type.STRING, enum: ['unlimited', 'allowed'] },
                allowedRetroTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
                retroReason: { type: Type.STRING, enum: ['enabled', 'disabled'] },
                promptType: { type: Type.STRING, enum: ['none', 'days', 'month'] },
                monthlyLimit: { type: Type.STRING },
                dailyLimit: { type: Type.STRING },
                timeLimitPast: { type: Type.BOOLEAN },
                onlyWorkHours: { type: Type.BOOLEAN }
            } 
        };

        if (forcedType) {
             systemInstruction = `Extract information for a ${forcedType} from the user input. Return JSON.`;
             schema = {
                 type: Type.OBJECT,
                 properties: {
                     type: { type: Type.STRING, enum: [forcedType] },
                     data: forcedType === 'ORG' ? orgSchema : forcedType === 'POSITION' ? positionSchema : forcedType === 'DUTY' ? dutySchema : forcedType === 'RETRO_RULE' ? retroSchema : categorySchema
                 },
                 required: ['type', 'data']
             };

        } else {
            systemInstruction = `
                Analyze the user's intent to create business data.
                Determine if they want to create an Organization (ORG), Job Position (POSITION), Job Duty (DUTY), Job Duty Category (CATEGORY), or Retro Rule (RETRO_RULE).
                
                If the user's input implies creating MULTIPLE things (e.g. "Create a department AND a position"), identify all candidates.
                Return type "MULTI_CANDIDATES" and a list of candidates with their types and names.
                
                If the intent is AMBIGUOUS (e.g. "Create Manager" could be position or duty), return type "AMBIGUOUS" and provide options.
                
                If the intent is clear and singular, extract the relevant data fields.
                
                For Retro Rules (RETRO_RULE), carefully extract:
                - 'monthlyLimit' (e.g., "3 times a month")
                - 'dailyLimit' (e.g., "1 time a day")
                - 'onlyWorkHours' (true if mentioned "only during work hours")
                - 'scope' (all or partial)
                
                Return JSON.
            `;
            
            schema = {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, enum: ['ORG', 'POSITION', 'DUTY', 'CATEGORY', 'RETRO_RULE', 'AMBIGUOUS', 'MULTI_CANDIDATES'] },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    candidates: { 
                        type: Type.ARRAY, 
                        items: { 
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING, enum: ['ORG', 'POSITION', 'DUTY', 'CATEGORY', 'RETRO_RULE'] },
                                name: { type: Type.STRING }
                            },
                            required: ['type', 'name']
                        }
                    },
                    data: { 
                        type: Type.OBJECT,
                        description: "The extracted data based on the type. Null if AMBIGUOUS or MULTI_CANDIDATES.",
                        properties: {
                             name: { type: Type.STRING },
                             ruleName: { type: Type.STRING },
                             code: { type: Type.STRING },
                             description: { type: Type.STRING },
                             parentOrg: { type: Type.STRING },
                             headcount: { type: Type.STRING },
                             manager: { type: Type.STRING },
                             department: { type: Type.STRING },
                             category: { type: Type.STRING },
                             jobGrade: { type: Type.STRING },
                             type: { type: Type.STRING }, 
                             location: { type: Type.STRING },
                             scope: { type: Type.STRING },
                             allowRetro: { type: Type.BOOLEAN },
                             retroType: { type: Type.STRING },
                             allowedRetroTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
                             retroReason: { type: Type.STRING },
                             promptType: { type: Type.STRING },
                             monthlyLimit: { type: Type.STRING },
                             dailyLimit: { type: Type.STRING },
                             timeLimitPast: { type: Type.BOOLEAN },
                             onlyWorkHours: { type: Type.BOOLEAN }
                        }
                    }
                },
                required: ['type']
            };
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `User Input: "${text}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const jsonStr = response.text || "{}";
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("AI Parsing failed, falling back to mock:", error);
        return runMock();
    }
  },

  // Updated method to accept structured candidates
  generateBatchContent: async (candidates: IAiCandidate[], originalInput: string): Promise<{ type: string, data: any }[]> => {
      const runMock = () => new Promise<{ type: string, data: any }[]>(resolve => {
          setTimeout(() => {
              const results = candidates.map(candidate => {
                  if (candidate.type === 'ORG') return { type: 'ORG', data: { name: candidate.name, type: '部门', parentOrg: '许波波测试公司', headcount: '10' } };
                  if (candidate.type === 'POSITION') return { type: 'POSITION', data: { name: candidate.name, department: '产品部', headcount: '1' } };
                  if (candidate.type === 'DUTY') return { type: 'DUTY', data: { name: candidate.name, code: 'DT001' } };
                  if (candidate.type === 'CATEGORY') return { type: 'CATEGORY', data: { name: candidate.name } };
                  if (candidate.type === 'RETRO_RULE') return { type: 'RETRO_RULE', data: { ruleName: candidate.name, scope: 'all' } };
                  return { type: 'ORG', data: {} };
              });
              resolve(results);
          }, 1500);
      });

      if (!process.env.API_KEY) {
          return runMock();
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            The user wants to create multiple business objects based on the input: "${originalInput}".
            The confirmed candidates to create are: ${JSON.stringify(candidates)}.
            
            For EACH candidate, extract or generate reasonable data based on the input and the candidate name provided.
            Return an array of objects, where each object has a 'type' (matching the candidate type) and 'data' (the fields).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, enum: ['ORG', 'POSITION', 'DUTY', 'CATEGORY', 'RETRO_RULE'] },
                            data: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    ruleName: { type: Type.STRING },
                                    code: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    parentOrg: { type: Type.STRING },
                                    department: { type: Type.STRING },
                                    headcount: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    category: { type: Type.STRING },
                                    scope: { type: Type.STRING },
                                    monthlyLimit: { type: Type.STRING }
                                }
                            }
                        },
                        required: ['type', 'data']
                    }
                }
            }
        });

        const jsonStr = response.text || "[]";
        return JSON.parse(jsonStr);

      } catch (e) {
          console.error("Batch generation failed, falling back to mock:", e);
          return runMock();
      }
  },

  getAiSuggestion: async (currentValue: string, context: string[], type: string): Promise<string> => {
    if (!process.env.API_KEY) {
        console.warn("API Key not found. Returning mock AI suggestion.");
        return new Promise((resolve) => {
            setTimeout(() => {
                if (type === 'POSITION') {
                    if (context.some(c => c.includes('产品') || c.includes('研发'))) return resolve('高级产品经理');
                    return resolve('新职位');
                }
                if (type === 'ORG') {
                    if (currentValue.includes('产品')) return resolve('产品研发部');
                    return resolve('新部门');
                }
                 if (type === 'DUTY') return resolve('相关职务');
                 if (type === 'CATEGORY') return resolve('相关分类');
                 
                resolve(currentValue + ' (优化)');
            }, 800);
        });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            Context of items being created: ${JSON.stringify(context)}.
            Current item type: ${type}.
            Current item input: "${currentValue}".
            
            Task: Suggest a better, more professional name for this item based on the context. 
            For example, if context has "Product Dept", suggest "Product Manager" for a Position.
            Return ONLY the suggested name text.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text?.trim() || currentValue;
    } catch (e) {
        console.error("AI Suggestion failed", e);
        return currentValue;
    }
  },

  adjustPerformanceIndicator: async (originalData: any, requirement: string): Promise<any> => {
    const runMock = () => new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve({
                ...originalData,
                desc: `${originalData.desc} [基于要求: ${requirement}]`,
                meta: {
                    ...originalData.meta,
                    target: `${originalData.meta.target} [基于要求: ${requirement}]`
                },
                _modified: true
            });
        }, 1000);
    });

    if (!process.env.API_KEY) {
        return runMock();
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            Context: HR Performance Indicator Adjustment.
            
            Original Data:
            Name: ${originalData.title}
            Description: ${originalData.desc}
            Target Value: ${originalData.meta.target}
            
            User Requirement: "${requirement}"
            
            Task: Rewrite the 'Description' and 'Target Value' to meet the user's requirement.
            Constraint: Return JSON with 'description' and 'target' fields. Do not change the Name.
            Language: Chinese.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        target: { type: Type.STRING }
                    },
                    required: ['description', 'target']
                }
            }
        });

        const result = JSON.parse(response.text || "{}");
        return {
            ...originalData,
            desc: result.description,
            meta: {
                ...originalData.meta,
                target: result.target
            },
            _modified: true
        };

    } catch (error) {
        console.error("AI Adjustment failed, falling back to mock:", error);
        return runMock();
    }
  },

  checkDocumentCompliance: async (content: string): Promise<any> => {
      const runMock = () => new Promise<any>((resolve) => {
          setTimeout(() => {
              resolve({
                  overallStatus: 'WARNING',
                  issues: [
                      {
                          type: 'RISK',
                          severity: 'HIGH',
                          description: '社保条款存在风险，未明确公司承担的社保义务。',
                          suggestion: '建议明确列出公司依法缴纳五险一金的条款，避免使用“现金补贴替代”等可能违规的表述。',
                          quote: '鉴于乙方自愿放弃缴纳社会保险，甲方按月向乙方发放500元现金补贴，以此替代社会保险的缴纳。甲方不再承担任何社保统筹义务。'
                      },
                      {
                          type: 'WARNING',
                          severity: 'MEDIUM',
                          description: '试用期时间设定与合同期限临界，建议复核。',
                          suggestion: '三年期合同试用期不得超过6个月，当前设定刚好6个月，需严格执行。',
                          quote: '试用期自 2026年2月1日 起至 2026年8月31日 止。'
                      },
                      {
                          type: 'INFO',
                          severity: 'LOW',
                          description: '未明确加班费的具体计算基数。',
                          suggestion: '虽然提到加班费包含在工资内，但建议明确计算基数以防争议。',
                          quote: '乙方同意加班费已包含在每月固定基本工资内，不再另行支付。'
                      },
                      {
                          type: 'INFO',
                          severity: 'MEDIUM',
                          description: '竞业限制条款缺失',
                          suggestion: '对于核心技术岗位，建议补充竞业限制条款及补偿金约定，以保护公司知识产权。',
                          quote: ''
                      },
                       {
                          type: 'WARNING',
                          severity: 'LOW',
                          description: '工作地点约定过于宽泛',
                          suggestion: '“根据业务需要调整”可能被认定为免除法定责任，建议明确调整的合理性标准。',
                          quote: '甲方有权单方面调整乙方的工作岗位及地点，乙方必须无条件服从。'
                      },
                       {
                          type: 'RISK',
                          severity: 'HIGH',
                          description: '违约金金额过高风险',
                          suggestion: '20,000元违约金可能被认定过高，需确保与培训费用等实际损失挂钩。',
                          quote: '应向甲方支付违约金人民币 20,000 元。'
                      }
                  ]
              });
          }, 2000);
      });

      if (!process.env.API_KEY) {
          return runMock();
      }

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const prompt = `
              你是一名专业的法律合规顾问。请检查以下劳动合同/文档内容的合规性。
              重点关注：劳动法合规性、社保缴纳、试用期规定、违约金条款等。
              
              文档内容：
              """
              ${content.substring(0, 10000)}
              """
              
              请返回 JSON 格式结果，包含：
              1. overallStatus: 'PASS' | 'WARNING' | 'DANGER'
              2. issues: 数组，每个元素包含：
                 - type: 'RISK' (法律风险) | 'WARNING' (建议优化) | 'INFO' (提示)
                 - severity: 'HIGH' | 'MEDIUM' | 'LOW'
                 - description: 问题描述 (简练)
                 - suggestion: 修改建议
                 - quote: 原文中的具体问题条款片段 (用于在文档中定位，必须完全匹配原文)
          `;

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          overallStatus: { type: Type.STRING, enum: ['PASS', 'WARNING', 'DANGER'] },
                          issues: {
                              type: Type.ARRAY,
                              items: {
                                  type: Type.OBJECT,
                                  properties: {
                                      type: { type: Type.STRING },
                                      severity: { type: Type.STRING },
                                      description: { type: Type.STRING },
                                      suggestion: { type: Type.STRING },
                                      quote: { type: Type.STRING }
                                  }
                              }
                          }
                      }
                  }
              }
          });

          return JSON.parse(response.text || "{}");
      } catch (error) {
          console.error("Compliance Check failed, falling back to mock:", error);
          return runMock();
      }
  },

  modifyDocument: async (originalContent: string, instruction: string): Promise<string> => {
      const runMock = () => new Promise<string>((resolve) => {
          setTimeout(() => {
              let modified = originalContent;
              // Precise replacement logic for demo fidelity
              if (instruction.includes("社保") || instruction.includes("保险")) {
                  modified = modified.replace(
                      "鉴于乙方自愿放弃缴纳社会保险，甲方按月向乙方发放500元现金补贴，以此替代社会保险的缴纳。甲方不再承担任何社保统筹义务。",
                      "<span class='ai-modified-highlight' data-reason='AI Compliance Optimization: Social Security Clause'>甲乙双方应依法参加社会保险。甲方将按照国家和地方规定，为乙方缴纳各项社会保险费用。个人应承担的部分由甲方从乙方工资中代扣代缴。</span>"
                  );
              }
              if (instruction.includes("违约金")) {
                  // Target exact HTML structure from DEFAULT_CONTENT
                  modified = modified.replace(
                      '违约金人民币 <span style="font-weight: bold; text-decoration: underline;">20,000</span> 元', 
                      '违约金人民币 <span class="ai-modified-highlight" data-reason="AI Recommendation: Reasonable Penalty">5,000</span> 元'
                  );
              }
              if (instruction.includes("试用期")) {
                  // Target exact HTML structure from DEFAULT_CONTENT
                  modified = modified.replace(
                      '2026年8月31日', 
                      '<span class="ai-modified-highlight" data-reason="AI Adjustment: Probation Period">2026年7月31日</span>'
                  );
              }
              if (instruction.includes("工作地点")) {
                  modified = modified.replace(
                      "根据业务需要，甲方有权单方面调整乙方的工作岗位及地点，乙方必须无条件服从。", 
                      "<span class='ai-modified-highlight' data-reason='AI Compliance: Work Location Adjustment'>甲方因生产经营需要调整乙方工作地点，应与乙方协商一致。</span>"
                  );
              }
              resolve(modified);
          }, 1500);
      });

      if (!process.env.API_KEY) {
          return runMock();
      }

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const prompt = `
              你是一名专业的文档编辑助手。请根据用户的修改指令，修改提供的 HTML 文档内容。
              
              原文内容：
              """
              ${originalContent}
              """
              
              用户指令：
              "${instruction}"
              
              **重要原则**：
              1. **精准修改**：只针对指令中提到的具体问题进行修改，**绝对不要**修改、优化或重写文档中的其他部分（即使其他部分存在问题）。
              2. **保持原样**：除修改点外，文档的其余部分必须保持与原文完全一致，包括HTML结构、样式、文字内容等。
              3. **视觉反馈**：对于修改过的部分，**必须**使用 <span class='ai-modified-highlight' data-reason='[Change Reason]'>...</span> 包裹。 'data-reason' 属性应简要说明修改原因（例如：“AI 合规调整”、“响应用户指令”）。
              
              要求：
              1. 返回修改后的完整 HTML 内容。
              2. 不要返回 JSON，直接返回 HTML 字符串。
          `;

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt,
          });

          return response.text || originalContent;
      } catch (error) {
          console.error("Modify Document failed, falling back to mock:", error);
          return runMock();
      }
  }
};
