import request from 'supertest';
import express from 'express';
import { LegislatorBillController } from '../controller/legislatorBills.controller.js';
import { jest } from '@jest/globals';

describe('LegislatorBillController', () => {
    let app;
    let controller;

    const mockData = {
        legislatorBills: [
            {
                id: 1,
                title: 'John Doe',
                supported: 5,
                opposed: 2
            }
        ],
        billVotes: [
            {
                id: 1,
                title: 'Healthcare Bill',
                supported: 10,
                opposed: 5,
                primarySponsor: 'John Doe'
            }
        ]
    };

    beforeEach(() => {
        app = express();
        
        const mockService = {
            getLegislatorBills: jest.fn().mockResolvedValue(mockData)
        };

        controller = new LegislatorBillController(mockService);
        app.get('/', (req, res) => controller.getLegislatorBills(req, res));
    });

    describe('GET /', () => {
        test('should return HTML with legislative data', async () => {
            const response = await request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200);

            expect(response.text).toContain('Legislative Data');
            expect(response.text).toContain('Legislators');
            expect(response.text).toContain('Bills');

            expect(response.text).toContain('John Doe');
            expect(response.text).toContain('Healthcare Bill');
            expect(response.text).toContain('5'); 
            expect(response.text).toContain('2'); 
        });

        test('should handle service errors', async () => {
            const errorApp = express();
            const errorService = {
                getLegislatorBills: jest.fn().mockRejectedValue(new Error('Service Error'))
            };
            const errorController = new LegislatorBillController(errorService);
            
            errorApp.get('/', (req, res) => errorController.getLegislatorBills(req, res));

            await request(errorApp)
                .get('/')
                .expect(500);
        });
    });
});