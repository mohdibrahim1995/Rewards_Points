import { logger } from '../utils/logger';

describe('Logger', () => {
    it('should log an info message', () => {
        const spy = jest.spyOn(logger, 'info');
        logger.info('Test info message');
        expect(spy).toHaveBeenCalledWith('Test info message');
    });

    it('should log an error message', () => {
        const spy = jest.spyOn(logger, 'error');
        logger.error('Test error message');
        expect(spy).toHaveBeenCalledWith('Test error message');
    });
});
